export const OfferTag = () => {
  enum TAG {
    PEDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    CANCELED = "CANCELED",
    EXPIRED = "EXPIRED",
  }
  interface TagConfig {
    body: React.ReactNode;
  }

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
    [TAG.PEDING]: {
      body: <div className="bg-[#DE7B30] p-1 rounded">{TAG.PEDING}</div>,
    },
  };

  return (
    <div className="shadow-tag p-semibold-dark flex items-center">
      {Tags[TAG.PEDING].body}
    </div>
  );
};
