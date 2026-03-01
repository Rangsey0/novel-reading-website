function Error({ message }) {
  return (
    <div className="flex justify-center items-center h-96">
      <p className="text-red-500 text-lg">
        ⚠️ {message || "Something went wrong"}
      </p>
    </div>
  );
}

export default Error;
