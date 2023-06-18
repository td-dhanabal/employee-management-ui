import React from 'react'
import { Spin } from "antd";

export default function LoaderView({ message }) {
    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "25%",
            }}
            className="loadingView"
        >
            <Spin size="large" />

            <h2 className="mt-3">{message}</h2>
        </div>
    );

}
