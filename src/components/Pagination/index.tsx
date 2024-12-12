import {
  PaginationContent,
  Pagination as PaginationCpn,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/pagination';

export interface PaginationProps {
  data: {
    pageNumber?: number;
    totalPages?: number;
  } | null;
  onPageChange: (pageNumber: number) => void;
}
const Pagination = ({ data, onPageChange }: PaginationProps) => {
  console.info(data)
  return (
    <PaginationCpn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => data?.pageNumber && onPageChange(data ? data.pageNumber - 1 : 1)}
            disabled={data?.pageNumber === 1 || data?.pageNumber === 0}
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
            onClick={() => onPageChange(data?.pageNumber ? data.pageNumber + 1 : 1)}
            disabled={data?.pageNumber === data?.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationCpn>
  );
};

export default Pagination;
