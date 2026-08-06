function CustomerCard({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}

export default CustomerCard;