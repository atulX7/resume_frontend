export default function Error403Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">403 - Usage Limit Reached</h1>
      <p className="text-gray-600 mb-4">
        You have reached your usage limit for this service.
      </p>
      <p className="text-gray-600">
        Please upgrade your plan or try again later.
      </p>
    </div>
  );
}