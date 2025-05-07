const DetailModalSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <table className="w-full text-left">
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="border-b border-gray-200">
            <th className="py-2 pr-4 w-1/3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </th>
            <td className="py-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-16 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default DetailModalSkeleton;
