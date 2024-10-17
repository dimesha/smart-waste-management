import QRCodeReader from "../components/QRCodeReader";
import background from "../assets/background.png";

const QRPage = () => {

  return (
    <div
      className="flex lg:flex-col flex-col justify-between gap-8 p-8 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <QRCodeReader />
    </div>
  );
};

export default QRPage;
