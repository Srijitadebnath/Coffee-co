import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
    const tables = [1, 2, 3, 4]; // your table numbers
    const baseURL = "https://coffeeCo.com/menu"; // replace with your deployed website URL

    return (
        <div className="flex gap-8 flex-wrap">
            {tables.map(table => (
                <div key={table} className="flex flex-col items-center">
                    <QRCode
                        value={`${baseURL}?table=${table}`}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#000000"
                    />
                    <p className="mt-2 font-bold">Table {table}</p>
                </div>
            ))}
        </div>
    );
};

export default QRCodeGenerator;