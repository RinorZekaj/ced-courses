import React, { useState, useEffect } from 'react';

import classes from './InfoTable.module.css';
import InfoTableRow from './InfoTableRow/InfoTableRow'
import Pagination from './Pagination';

const Infotable = ( props ) => {
    const [costs, setCosts] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [currentPage, setCurrentPage] = useState(1);
    const [costsPerPage] = useState(2);

    useEffect(() => {
        setCosts(props.data)
        console.log("3")
    }, [props.data])

    const indexOfLastCost = currentPage * costsPerPage;
    const indexOfFirstCost = indexOfLastCost - costsPerPage;
    const currentCosts = costs.slice(indexOfFirstCost, indexOfLastCost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return <div className={classes.infotable}>
        <div>
            <table id={classes.tableInfo}>
                <thead>
                    <tr className={classes.tableHeader}>
                        <td className={classes.tabletd}>NAME</td>
                        <td className={classes.tabletd}>PROFIT</td>
                        <td className={classes.tabletd}>DESCRIPTION</td>
                        <td className={classes.tabletd}>DATE</td>
                    </tr>
                </thead>

                <tbody>
                    <InfoTableRow data={currentCosts} loading={loading} />
                </tbody>
            </table>
            <Pagination costsPerPage={costsPerPage} totalCosts={costs.length} paginate={paginate} />
        </div>
    </div>
};

export default Infotable;