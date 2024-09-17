export default function FirebaseTest({ showNumber }) {
  return (
    <div>
      <p className="text-xl text-yellow-400">
        Aquí el número de intentos: <span>{showNumber}</span>
      </p>
    </div>
  );
}
