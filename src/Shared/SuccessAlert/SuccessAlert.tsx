// SuccessAlert.tsx
import { Button } from "@mui/material";

type Props = {
  message: string;
  onConfirm: () => void;
};

export default function SuccessAlert({ message, onConfirm }: Props) {
  return (
    <div className="fixed top-0 left-0 z-100 w-full h-full bg-[#0a0a0a38] flex items-start justify-center">
      <div className="bg-white rounded-xl !p-2 sm:!px-2 sm:!py-2 lg:!px-4 lg:!py-4 shadow-xl text-center max-w-md sm:w-sm w-[80%] !mt-[100px] !space-y-2">
        <h2 className="text-lg sm:text-xl mb-2 sm:mb-4 lg:mb-4">{message.includes('❌') ? "❌ Failed": "✅ Success"}</h2>
        <p className="mb-2 sm:mb-4 lg:mb-6 text-md sm:text-[16px] whitespace-pre-line">{message}</p>
        <Button variant="contained"
          onClick={onConfirm}
          className="!bg-green-500 text-white !px-4 !py-1 rounded hover:!bg-green-600 transition
          text-sm sm:text-[16px]
          "
        >
          OK
        </Button>
      </div>
    </div>
  );
}
