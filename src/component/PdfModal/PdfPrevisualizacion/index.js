import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf"; 
import "./styles.css"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePage(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    const { pdf } = props;

    return (
            <>
                <Document
                    file={pdf}
                    options={{ workerSrc:"https://npmcdn.com/pdfjs-dist@1.7.225/build/pdf.worker.js"}}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                
                <div className="botonContainer">
                    <p>
                        Página {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
                    </p>
                    <button className=" btn fourth" disabled={pageNumber <= 1} onClick={previousPage}>
                        Anterior
                    </button>
                    <button className=" btn fourth"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                    >
                        Siguiente
                    </button>
                </div>
            </>
        );
}
