"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "./button"

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
    const [visiblePages, setVisiblePages]: any = useState([])

    useEffect(() => {
        setVisiblePages(calculateVisiblePages(currentPage, totalPages))
    }, [currentPage, totalPages])

    const calculateVisiblePages = (currentPage: number, totalPages: number) => {
        let startPage = currentPage - 2
        let endPage = currentPage + 2

        if (startPage < 1) {
            endPage += Math.abs(startPage) + 1
            startPage = 1
        }

        if (endPage > totalPages) {
            startPage -= endPage - totalPages
            endPage = totalPages
        }

        const visiblePages = []
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i)
        }
        return visiblePages
    }

    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber)
    }

    return (
        <div className="pagination">
            <Button
                size="sm"
                variant="outline"
                className={
                    currentPage === 1
                        ? "pagination-btn icon disabled"
                        : "pagination-btn icon"
                }
                disabled={currentPage === 1}
                onClick={() => handlePageChange(1)}
            >
                <ChevronsLeft size={18} />
            </Button>
            <Button
                size="sm"
                variant="outline"
                className={
                    currentPage === 1 ? "pagination-btn disabled" : "pagination-btn"
                }
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft size={18} />
            </Button>

            {/* {visiblePages[0] > 1 && (
        <>
          <button onClick={() => handlePageChange(1)}>1</button>
          <span>...</span>
        </>
      )} */}

            {visiblePages.map(
                (pageNumber: number) =>
                    pageNumber >= 1 && (
                        <Button
                            key={pageNumber}
                            className={
                                currentPage === pageNumber
                                    ? "pagination-btn active"
                                    : "pagination-btn"
                            }
                            disabled={currentPage === pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                            {currentPage === pageNumber && <motion.div
                                className="pagination-background"
                                layoutId="pagination"
                                transition={{
                                    type: 'spring',
                                    stiffness: 350,
                                    damping: 30,
                                }}
                            />}
                        </Button>
                    )
            )}


            <Button
                size="sm"
                variant="outline"
                className={
                    currentPage === totalPages
                        ? "pagination-btn disabled"
                        : "pagination-btn"
                }
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <ChevronRight size={18} />
            </Button>
            <Button
                size="sm"
                variant="outline"
                className={
                    currentPage === totalPages
                        ? "pagination-btn icon disabled"
                        : "pagination-btn icon"
                }
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
            >
                <ChevronsRight size={18} />
            </Button>
        </div>
    )
}

export default Pagination
