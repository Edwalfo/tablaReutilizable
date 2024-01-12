/**
 * IReusableTableProps Interface
 * @interface IReusableTableProps
 * @template T
 * @property {string[]} columns - The columns of the table.
 * @property {T[]} data - The data to be displayed in the table.
 * @property {string} title - The title of the table.
 * @property {boolean} [pagination] - If true, pagination is enabled.
 * @property {number} rowsPerPage - The number of rows to be displayed per page.
 * @property {(id: number) => void} handleEdit - The function to handle the edit action.
 * @property {(id: number) => void} handleDelete - The function to handle the delete action.
 */
interface IReusableTableProps<T> {
  columns: string[];
  data: T[];
  title: string;
  pagination?: boolean;
  rowsPerPage?: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

import { useEffect, useState } from "react";
import "./ReusableTable.css";

/**
 * ReusableTable Component
 * @function ReusableTable
 * @template T
 * @param {IReusableTableProps<T>} props - The properties of the component.
 * @returns {JSX.Element} - The rendered component.
 */
function ReusableTable<T>({
  columns,
  data,
  title,
  pagination = true,
  rowsPerPage = 5,
  handleEdit,
  handleDelete,
}: IReusableTableProps<T>) {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Update the filtered data when the data or the current page changes.
  useEffect(() => {
    if (pagination) {
      const paginatedData = paginateData(data, currentPage);
      setFilteredData(paginatedData);
    }
  }, [data, currentPage]);

  // Function to paginate the data.
  const paginateData = (data: T[], page: number) => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  };

  // Function to go to the next page.
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page.
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to go to a specific page.
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Generate the page numbers.
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Capitalize the title columns.
  const capitalize = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  // Render the component.
  return (
    <>
      <h1 className="title">{title}</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column: string) => (
              <th key={column}>{capitalize(column)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {columns.map((column: string) => (
                <td key={column}>{row[column]}</td>
              ))}
              <td>
                <div className="btn-container">
                  <button
                    className="button button-edit margin-right"
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button button-delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="pagination-container">
          <p>
            Showing {currentPage} of {totalPages} pages
          </p>
          <div className="pagination-buttons">
            <button
              className="button button-pagination margin-right"
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`button button-pagination margin-right ${
                  currentPage === number ? "active" : ""
                }`}
                onClick={() => goToPage(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="button button-pagination"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReusableTable;
