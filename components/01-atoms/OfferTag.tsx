export enum TAG {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
}

interface OfferTagProps {
  status: string;
}

export const OfferTag = ({ status }: OfferTagProps) => {
  interface TagConfig {
    body: React.ReactNode;
  }

  // TODO: Test that
  const getTagStatus = () => {
    switch (status) {
      case "created" || "Received":
        return TAG.PENDING;
      case "canceled":
        return TAG.CANCELED;
      case "accepted":
        return TAG.ACCEPTED;
      case "expired":
        return TAG.EXPIRED;
      default:
        return TAG.PENDING;
    }
  };

  const Tags: Record<TAG, TagConfig> = {
    [TAG.ACCEPTED]: {
      body: <div className="bg-[#10584C] p-1 rounded">{TAG.ACCEPTED}</div>,
    },
    [TAG.CANCELED]: {
      body: <div className="bg-[#D7544E] p-1 rounded">{TAG.CANCELED}</div>,
    },
    [TAG.EXPIRED]: {
      body: <div className="bg-[#4A4F80] p-1 rounded">{TAG.EXPIRED}</div>,
    },
    [TAG.PENDING]: {
      body: <div className="bg-[#DE7B30] p-1 rounded">{TAG.PENDING}</div>,
    },
  };

  return (
    <div className="shadow-tag p-semibold-dark flex items-center">
      {Tags[getTagStatus()].body}
    </div>
  );
};
