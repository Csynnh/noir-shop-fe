import { ProductResponse } from '@pages/ManagementProduct';
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationCpn,
} from '@ui/pagination';

interface PaginationProps {
  data: any | null;
  onPageChange: (pageNumber: number) => void;
}
const Pagination = ({ data, onPageChange }: PaginationProps) => {
  return (
    <PaginationCpn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(data ? data.pageNumber - 1 : 1)}
            disabled={data?.pageNumber === 1}
          />
        </PaginationItem>
        {Array.from({ length: data?.totalPages || 0 }, (_, index) => {
          const pageNumber = index + 1;
          const currentPage = data?.pageNumber || 1;
          const totalPages = data?.totalPages || 0;

          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => onPageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (
            (pageNumber === 2 && currentPage > 3) ||
            (pageNumber === totalPages && currentPage < totalPages - 1) ||
            (pageNumber === currentPage + 2 && currentPage < totalPages - 3)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(data ? data.pageNumber + 1 : 1)}
            disabled={data?.pageNumber === data?.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationCpn>
  );
};

export default Pagination;
