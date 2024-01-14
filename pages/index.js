import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://adevinta.com/app/uploads/2023/06/Meetup-Barcelona-May-2023-1-700x368.jpg",
//     address: "Some address 5, 12345 some city",
//     description: "This is teh first meetup",
//   },
//   {
//     id: "m2",
//     title: "A First Meetup",
//     image:
//       "https://adevinta.com/app/uploads/2023/06/Meetup-Barcelona-May-2023-1-700x368.jpg",
//     address: "Some address 10, 12345 some city",
//     description: "This is teh first meetup",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from a API
  const client = await MongoClient.connect(
    "mongodb+srv://ayushsingh916:Ujf8sM8FxPKKx0Sj@cluster0.skwwgka.mongodb.net/test?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // console.log(meetups);

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
