import React from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = () => {
    const baseUrl = "https://coffee-co-zeta.vercel.app/"; // 🔥 your live URL
    const tables = [1, 2, 3, 4, 5, 6]; // change based on your cafe

    return (
        <div className="min-h-screen bg-background-dark text-primary p-10">
            <h1 className="text-4xl font-bold text-center mb-10">
                Table QR Codes
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                {tables.map((table) => {
                    const url = `${baseUrl}/?table=${table}`;

                    return (
                        <div
                            key={table}
                            className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-lg"
                        >
                            <h2 className="mb-4 font-bold text-lg text-black">
                                Table {table}
                            </h2>

                            <QRCode value={url} size={150} />

                            <p className="mt-4 text-xs text-black text-center break-all">
                                {url}
                            </p>

                            <button
                                onClick={() => window.print()}
                                className="mt-4 bg-accent text-white px-4 py-2 rounded-full text-xs"
                            >
                                Print
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QRCodeGenerator;