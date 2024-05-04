import React from 'react';
import { PDFDownloadLink, Document, Page, Image, Text } from '@react-pdf/renderer';

interface HeaderProps {
  mapImage: string;
  captureMap: () => void;
}

const Header: React.FC<HeaderProps> = ({ mapImage, captureMap }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg">旅ルート最適化</h1>
      <div>
        <button
          onClick={captureMap}
          className="mr-4 p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Create PDF
        </button>
        {mapImage && (
          <PDFDownloadLink
            document={
              <Document>
                <Page size="B4" orientation="landscape">
                  <Image style={{ width: '100%', height: 'auto' }} src={mapImage} />
                  <Text>MEMO</Text>
                </Page>
              </Document>
            }
            fileName="map-output.pdf"
            style={{ textDecoration: 'none' }}
          >
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
        )}
      </div>
    </header>
  );
};

export default Header;
