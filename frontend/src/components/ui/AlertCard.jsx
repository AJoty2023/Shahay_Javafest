import React from "react";

export const AlertCard = ({ alert, onRespond, onResolve }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{alert.alertType}</h3>
        <p className="text-sm text-gray-500">Priority: {alert.priorityLevel}</p>
        <p className="text-sm text-gray-500">
          Location: {alert.latitude}, {alert.longitude}
        </p>
        <p className="text-sm text-gray-400">Status: {alert.status}</p>
      </div>
      <div className="flex space-x-2">
        {onRespond && (
          <button
            onClick={() => onRespond(alert.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Respond
          </button>
        )}
        {onResolve && (
          <button
            onClick={() => onResolve(alert.id)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
};
