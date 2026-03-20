import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodePage = () => {
    const baseURL = "https://coffee-co-zeta.vercel.app";

    const tables = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-background-dark text-primary flex flex-col items-center justify-center p-10">

            <h1 className="text-4xl font-bold mb-10">QR Codes for Tables</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

                {tables.map((table) => {
                    const url = `${baseURL}?table=${table}`;

                    return (
                        <div key={table} className="bg-white p-4 rounded-xl text-center">

                            <QRCodeCanvas value={url} size={150} />

                            <p className="mt-3 font-bold text-black">
                                Table {table}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default QRCodePage;