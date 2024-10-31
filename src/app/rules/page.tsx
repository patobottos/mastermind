import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules and History",
  description: "Mastermind Rules and History",
};

const Rules = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[1000px] md:w-2/3 px-4">
        <h2 className="text-3xl font-semibold text-center my-8 border-b border-white pb-2">
          How to Play Mastermind
        </h2>

        <ol className="list-decimal list-inside space-y-4 text-lg leading-relaxed">
          <li>
            <strong>Objective:</strong> The goal is for you, the player, to
            guess a hidden color code set by the computer.
          </li>
          <li>
            <strong>Recommended Age:</strong> 7 and up.
          </li>
          <li>
            <strong>Setup:</strong>
            <ul className="list-disc list-inside ml-6">
              <li>
                The computer selects a secret code made of colored pegs and
                places them in a row.
              </li>
              <li>
                You’ll use a board with a series of holes to place your guesses.
              </li>
            </ul>
          </li>
          <li>
            <strong>Colors:</strong>
            <ul className="list-disc list-inside ml-6">
              <li>
                The code is made up of 5 pegs, each selected from 8 available
                colors. Colors can repeat, so there might be more than one of
                the same color in the code!
              </li>
            </ul>
          </li>
          <li>
            <strong>Making Guesses:</strong>
            <ul className="list-disc list-inside ml-6">
              <li>
                Each turn, you place 5 colored pegs on the board to make a
                guess.
              </li>
              <li>
                After each guess, the computer will give you clues with small
                pegs:
              </li>
              <ul className="list-inside ml-12">
                <li>
                  <strong>Black Peg:</strong> You’ve guessed a color that’s in
                  the correct position.
                </li>
                <li>
                  <strong>White Peg:</strong> You’ve guessed a correct color but
                  in the wrong position.
                </li>
                <li>
                  <em>Transparent Peg:</em> That color isn’t in the code at all.
                </li>
              </ul>
            </ul>
          </li>
          <li>
            <strong>Turns:</strong>
            <ul className="list-disc list-inside ml-6">
              <li>
                You have 8 tries to guess the exact code. With each guess and
                the clues provided, try to narrow down the color combination.
              </li>
            </ul>
          </li>
          <li>
            <strong>Winning:</strong>
            <ul className="list-disc list-inside ml-6">
              <li>
                You win if you guess the code with all colors in the correct
                order within the 8 tries. If you can’t, the computer wins!
              </li>
            </ul>
          </li>
          <li>
            <strong>Strategy:</strong> Use logic and deduction to refine each
            guess based on the feedback. Think carefully about each clue and
            adjust your guesses to get closer to the hidden code!
          </li>
        </ol>

        <h2 className="text-3xl font-semibold text-center my-8 border-b border-white pb-2">
          Mastermind History
        </h2>

        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Mastermind has its roots in an old paper-and-pencil game known as
            “Bulls and Cows,” popular in England and Italy under names like
            “Numerello.” In 1970, Israeli postmaster and telecommunications
            expert <strong>Mordecai Meirowitz</strong> adapted this game to
            create the Mastermind we know today. After many toy companies
            rejected the idea, a small British company, Invicta Plastics Ltd.,
            saw its potential and first produced it with colored pegs on a
            board. Later, Hasbro began distributing the game around the world.
          </p>
          <p>
            Since its release, Mastermind has become a classic. Known for its
            unique mix of strategy and deduction, it has captivated over 50
            million players worldwide. The game even drew the interest of
            mathematicians, like <strong>Donald Knuth</strong>, who in 1977
            proved that any Mastermind code could be cracked in five moves or
            fewer using a mathematical approach.
          </p>
          <p>
            Mastermind continues to challenge players of all ages, making it a
            beloved game that never goes out of style!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
