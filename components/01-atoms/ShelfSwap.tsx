import fetch from "node-fetch";

export const ShelfSwap = () => {
  const baseURL = process.env.NEXT_PUBLIC_ALCHEMY_HTTP;
  const address = "elanhalpern.eth";
  const url = `${baseURL}/getNFTs/?owner=${address}`;

  var requestOptions = {
    method: "get",
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("error", error));

  return (
    <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
      <div className="flex items-center">
        <div>Select a user to start swapping</div>
      </div>
    </div>
  );
};
