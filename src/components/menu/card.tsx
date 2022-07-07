import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
interface CardProps {
  phoneNumber: string;
  name: string;
}

function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }
  return null;
}

const Card: FC<CardProps> = ({ phoneNumber, name }) => {
  return (
    <div className="pl-5 pr-5">
      <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto b">
        <div className="flex space-x-4">
          <div className="flex justify-center items-center rounded-full h-12 w-12 bg-blue-500">
            <FontAwesomeIcon icon={faPhone} className="h-12 w-6  text-white" />
          </div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4">{formatPhoneNumber(phoneNumber)}</div>
            <div className="space-y-2">
              <div className="h-4 text-gray-400">{name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
