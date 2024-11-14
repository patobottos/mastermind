"use client";

function Footer() {
  return (
    <div className="flex flex-row justify-center mt-8 mb-4 border-t-2 pt-4 text-xs xxs:mx-0.5 xs:mx-0.5 xxs:text-xx text-light-text dark:text-dark-text border-light-border dark:border-dark-border">
      {/* Author Link */}
      <span className="mx-2 xxs:mx-1 xs:mx-1">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://patobottos.vercel.app/"
          className="decoration-inherit text-blue-600 dark:text-blue-100 cursor-pointer"
        >
          @Pato Bottos
        </a>
      </span>

      <span>|</span>

      {/* Based on Link */}
      <span className="mx-2 xxs:mx-1 xs:mx-1">
        Based on:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href=""
          className="decoration-inherit text-blue-600 dark:text-blue-100 cursor-pointer"
        >
          Hapsbro Game
        </a>
      </span>

      <span>|</span>

      {/* Location and Date */}
      <span className="mx-2 xxs:mx-1 xs:mx-1 text-gray-700 dark:text-gray-50 cursor-pointer">
        Barcelona, 2024
      </span>
    </div>
  );
}

export default Footer;
