import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import recycling from "../assets/home/recycling.png"
import colloction from "../assets/home/collection.png"
import composting from "../assets/home/composting.png"

export default function Home() {
  const navigate = useNavigate();

  // Handle navigation (Command Pattern)
  const handleNavigate = () => {
    navigate("/schedule/collection");
  };
  
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="bg-green-400 text-white py-20">
        <div className="container mx-auto px-4 text-center justify-center flex lg:flex-col items-center">
        <img
          src={logo}
          className="h-auto w-80 rounded-lg mb-10"
          alt="Waste Management Logo"
        />
          <h1 className="text-4xl font-bold mb-4">Efficient Waste Management Solutions</h1>
          <p className="text-xl mb-6">Sustainable waste collection and recycling services at your fingertips</p>
          <button className="bg-white text-green-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-green-100 transition" onClick={handleNavigate}>Schedule a Pickup</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">Our Services</h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <img src={recycling} alt="Recycling" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recycling</h3>
              <p>We provide efficient recycling services to help reduce waste and promote sustainability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <img src={colloction} alt="Trash Collection" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trash Collection</h3>
              <p>Our team ensures timely and reliable waste collection for residential and commercial areas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <img src={composting} alt="Composting" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Composting</h3>
              <p>Turn organic waste into valuable compost that helps in nourishing the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-green-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">Why Choose Us</h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Eco-friendly Practices</h3>
              <p>We follow sustainable methods to ensure minimal environmental impact.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Timely Service</h3>
              <p>Our scheduling system ensures timely pickups to keep your premises clean.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Advanced Tracking</h3>
              <p>Use our app to track your waste pickups, history, and recycling progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
          <div className="max-w-lg mx-auto">
            <form className="bg-gray-100 p-8 rounded-lg shadow">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-green-700 transition w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">What Our Clients Say</h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic mb-4">"Fantastic service! Very punctual and eco-friendly. Highly recommend!"</p>
              <h4 className="text-xl font-semibold">- John Doe</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic mb-4">"Their recycling program is amazing, and I love how easy it is to schedule pickups."</p>
              <h4 className="text-xl font-semibold">- Jane Smith</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic mb-4">"I've never had a more seamless waste management experience. Excellent!"</p>
              <h4 className="text-xl font-semibold">- Michael Johnson</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
