import styles from "./Pagination.module.css";

const Pagination = ({
  countries,
  countriesPerPage,
  currentPage,
  onPageChange,
}) => {
  // Calculamos el total de paginas
  const totalPages = Math.ceil(countries / countriesPerPage);

  // Creamos un array para renderizar los botones
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Funcion para cambiar de pagina
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <>
      <div className={styles.pagination}>
        {/* Renderizar botones para cambiar de página */}
        <div className={styles.paginationButtons}>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          <span>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
