import logo from "../assets/logo.png";
import mission from "../assets/mission.jpg";
import objective from "../assets/objective.jpg";

export default function About() {
  return (
    <div className="flex flex-col gap-2 mt-10 mb-10 px-6 max-w-6xl mx-auto">
      <div className="flex flex-row justify-center items-center my-10 mx-auto">
        <img
          src={logo}
          className="h-50 w-60 rounded-lg mr-10"
          alt="Waste Management Logo"
        />
        <h1 className="uppercase my-auto mr-auto text-green-600 dark:text-white text-5xl font-serif hidden lg:flex">
          About Us...
        </h1>
      </div>
      <hr className="border-gray-300 dark:border-green-400 mt-8" />
      <h1 className="text-2xl text-green-600 dark:text-white">
        WASTE MANAGEMENT SYSTEM
      </h1>
      <hr className="border-gray-300 dark:border-green-400 mb-3" />
      <p className="">
        The Waste Management System is designed to efficiently manage and track
        waste disposal processes across communities, industries, and cities. We
        focus on sustainability and environmental responsibility, aiming to
        reduce waste, promote recycling, and create cleaner environments for
        future generations.
      </p>
      <p className="mb-10">
        Our system integrates modern technologies, ensuring optimal performance
        and user experience. We aim to support various sectors by providing
        real-time monitoring and analytics, ultimately helping to meet
        eco-friendly goals globally.
      </p>
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-8">
        <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
          <img
            src={mission}
            className="h-50 w-full rounded-lg m-auto"
            alt="Mission"
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  uppercase">
              Our Mission...
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              To revolutionize waste management by fostering a culture of
              environmental sustainability.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
          <img
            src={objective}
            className="h-50 w-full rounded-lg m-auto"
            alt="Objectives"
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 uppercase">
              Our Objectives...
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              To minimize waste generation, enhance recycling efforts, and
              implement eco-friendly waste disposal methods.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8  dark:border-gray-700 mb-10">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 ">
          Manage Waste Anywhere
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Stay on top of waste management with our mobile app. Track waste
          collection, recycling, and disposal efforts in real time.
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <a
            href="#"
            className="w-full sm:w-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-gray-700"
          >
            <svg
              className="me-3 w-7 h-7"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              ></path>
            </svg>
            <div className="text-left rtl:text-right">
              <div className="mb-1 text-xs">Download on the</div>
              <div className="-mt-1 font-sans text-sm font-semibold">
                Mac App Store
              </div>
            </div>
          </a>
          <a
            href="#"
            className="w-full sm:w-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-gray-700"
          >
            <svg
              className="me-3 w-7 h-7"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 
499l280.8-161.2-60.1-60.1L104.6 499z"
              ></path>
            </svg>
            <div className="text-left rtl:text-right">
              <div className="mb-1 text-xs">Get it on</div>
              <div className="-mt-1 font-sans text-sm font-semibold">
                Google Play
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
