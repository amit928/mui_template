import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { DataTable } from 'primereact/datatable';
import { useRef } from "react";
import { useState } from "react";
import { Column } from "primereact/column";
import PandaLoader from "common/loaders/PandaLoader";
import MDTypography from "components/MDTypography";
import { PAGE_SIZE } from "lib/Constants";
import { useMaterialUIController } from "context";

export default function DataGridDemo({ rows, columns, count, onPageChange }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const common_color = useSelector((store) => store.common.common_color)

    const dynamicStyle = {
        '--dynamic-color': common_color.TEXT_COLOR,
    };

    const dynamicBackgroundStyle = {
        '--dynamic-background-color': common_color.BACKGROUND_COLOR,
    };

    // const tableRef = useRef(null);

    return (
        <Box sx={{ width: "100%", backgroundColor: "transparent" }} style={dynamicBackgroundStyle}>

            {/* <DataTable
                ref={tableRef}
                // loading={loading}
                scrollable scrollHeight={window.innerWidth > 1422 ? "500px" : "320px"}

                size='small'
                value={rows}
                selectionMode={'checkbox'}
                selection={selectedProducts}
                onSelectionChange={(e) => { setSelectedProducts(e.value) }}
                dataKey="id"
                // tableStyle={{ minWidth: props.minWidth ?? '110rem' }}
                style={dynamicBackgroundStyle}
            >
               <Column field={Object.keys(rows)[index]} header={Object.keys(rows)[index]}></Column>
               <Column field={Object.keys(rows)[index]} header={Object.keys(rows)[index]}></Column>
            </DataTable> */}

            {(rows && rows.length > 0) ? <DataGrid
                rows={rows ?? []}
                columns={columns ?? []}
                density="compact"
                pageSizeOptions={[10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
                style={{ color: common_color.TEXT_COLOR, borderColor: "transparent", paddingInline: 15, ...dynamicBackgroundStyle, maxHeight: 405, fontSize: 14 }}
                hideFooter

            />
                :
                <div style={{ paddingBlock: 10 }}>
                    <PandaLoader />
                    <MDTypography variant="h6" textAlign="center" mt={1} >
                        No Data Found
                    </MDTypography>
                </div>
            }

            <Pagination count={Math.ceil(count / PAGE_SIZE)} color={sidenavColor} showFirstButton showLastButton
                onChange={(e, page) => { onPageChange(page) }}
                style={{ ...dynamicStyle, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}
            />
        </Box>
    );
}
