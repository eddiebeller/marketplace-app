import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Offers: NextPage = () => {
  const messages = api.item.getMessage.useQuery();
  return (
    <>
      <Head>
        <title>Your Offers</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col  gap-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4 text-white">
        <h2 className="mt-2 text-4xl">Your Offers</h2>
        <div className="container">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages?.data?.map((message) => (
                  <tr
                    key={message.id}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{message.fromUserName}</td>
                    <td className="px-6 py-4">{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Offers;
