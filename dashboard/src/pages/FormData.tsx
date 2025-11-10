import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormEntry, FormEntriesResponse, getFormEntries, exportFormEntries } from "@/lib/api";

const FormData = () => {
  const [formData, setFormData] = useState<FormEntry[]>([]);
  const [filteredData, setFilteredData] = useState<FormEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFormData(pagination.currentPage);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, formData]);

  const fetchFormData = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response: FormEntriesResponse = await getFormEntries(page, pagination.itemsPerPage);
      setFormData(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch form data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = () => {
    if (!searchTerm) {
      setFilteredData(formData);
      return;
    }

    const filtered = formData.filter(
      (item) =>
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.committee.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const getMembershipBadgeColor = (type: string) => {
    switch (type) {
      case "new":
        return "bg-primary text-primary-foreground";
      case "old":
        return "bg-secondary text-secondary-foreground";
      case "other":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Function to export data to CSV
  const handleExport = async () => {
    if (formData.length === 0) {
      toast({
        title: "No Data",
        description: "There is no data to export",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      const blob = await exportFormEntries();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `enactus_form_data_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: "Form data has been exported to CSV file",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export form data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchFormData(page);
    }
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    
    // Show first page
    if (totalPages >= 1) {
      pages.push(
        <Button
          key={1}
          onClick={() => goToPage(1)}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
        >
          1
        </Button>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <span key="start-ellipsis" className="px-2 py-1 text-muted-foreground">
          ...
        </span>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < totalPages) {
        pages.push(
          <Button
            key={i}
            onClick={() => goToPage(i)}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
          >
            {i}
          </Button>
        );
      }
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="end-ellipsis" className="px-2 py-1 text-muted-foreground">
          ...
        </span>
      );
    }
    
    // Show last page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
        >
          {totalPages}
        </Button>
      );
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Form Data</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all membership submissions.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or committee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => fetchFormData(pagination.currentPage)} variant="outline" disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
        <Button onClick={handleExport} variant="default" disabled={isLoading || isExporting || formData.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Committee</TableHead>
              <TableHead className="font-semibold">Membership Type</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Payment Image</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading data...
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{item.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{item.phone}</TableCell>
                  <TableCell>{item.committee}</TableCell>
                  <TableCell>
                    <Badge className={getMembershipBadgeColor(item.membershipType)}>
                      {item.membershipType === 'new' ? 'New Member' : 
                       item.membershipType === 'old' ? 'Old Member' : 'Other'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.imageUrl ? (
                      <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        View Image
                      </a>
                    ) : (
                      "No image"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} total items)
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => goToPage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {renderPagination()}
            </div>
            
            <Button
              onClick={() => goToPage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormData;