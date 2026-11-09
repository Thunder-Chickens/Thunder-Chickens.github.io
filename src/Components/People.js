import React from 'react';
import './People.css';
import tim_scarlett from '../Images/tim_scarlett.jpeg';

// To update this section, edit these lists. `link` is optional.
const members = [
  { role: 'Club President', name: 'Scarlette Teran' },
  { role: 'Member', name: 'Timothy Loh' },
  { role: 'Member', name: 'Hannah Woo', link: 'https://www.instagram.com/hanana_woo/' },
  { role: 'Member', name: 'Pranay Krishnamurthi', link: 'https://www.instagram.com/pranaydk17/' },
  { role: 'Member', name: 'Abigail Dunn' },
  { role: 'Member', name: 'Rebekkah Chow' },
  { role: 'Member', name: 'Enoch Yeo' },
];

const alumni = [
  { role: 'Alumnus', name: 'Grace Wang', link: 'https://www.instagram.com/gwang.2007/' },
  { role: 'Alumnus', name: 'Noah Woo', link: 'https://www.instagram.com/_noah_wooo/' },
  { role: 'Alumnus/Founder', name: 'Peter Wang', link: 'https://www.linkedin.com/in/usc-peter-wang/' },
];

const awards = [
  {
    event: 'Apologetics',
    results: [
      { place: '2nd', of: 32, tournament: 'Blossom Festival', who: 'Grace', year: 2024 },
      { place: '11th', of: 54, tournament: 'Soli Deo Gloria', who: 'Peter', year: 2023 },
    ],
  },
  {
    event: 'Mars Hill',
    results: [
      { place: '1st', of: 17, tournament: 'Blossom Hill Festival', who: 'Grace', year: 2024 },
      { place: '4th', of: 23, tournament: 'Beacon at the Bay', who: 'Grace', year: 2024 },
    ],
  },
  {
    event: 'Original Oratory',
    results: [
      { place: '7th', of: 39, tournament: 'Silicon Valley Tournament', who: 'Scarlette', year: 2025 },
      { place: '9th', of: 43, tournament: 'Ready Response', who: 'Scarlette', year: 2025 },
      { place: '6th', of: 41, tournament: 'Beacon at the Bay', who: 'Grace', year: 2024 },
    ],
  },
  {
    event: 'Extemp',
    results: [
      { place: '6th', of: 24, tournament: 'Blossom Festival', who: 'Noah', year: 2024 },
      { place: '6th', of: 37, tournament: 'Act of Valor', who: 'Grace', year: 2023 },
    ],
  },
  {
    event: 'Impromptu',
    results: [
      { place: '5th', of: 49, tournament: 'Blossom Festival', who: 'Noah', year: 2024 },
      { place: '13th', of: 60, tournament: 'Ready Response', who: 'Noah', year: 2023 },
    ],
  },
];

const PersonList = ({ people }) => (
  <ul className="personList">
    {people.map(person => (
      <li key={person.name} className="person">
        <span className="personName">
          {person.link ? (
            <a href={person.link} target="_blank" rel="noreferrer" className="link">
              {person.name}
            </a>
          ) : person.name}
        </span>
        <span className="personRole">{person.role}</span>
      </li>
    ))}
  </ul>
);

const People = () => {
  return (
    <section id="people">
      <div className="peopleLeft">
        <h2 className="peopleTitle">Our Club</h2>
        <p className="peopleDesc">
          We currently consist of {members.length} members and {alumni.length} alumni,
          one of whom continues to debate at college.
        </p>

        <div className="peopleCards">
          <div className="peopleCard">
            <h3 className="cardHead">Members</h3>
            <PersonList people={members} />

            <h3 className="cardHead cardSubHead">Previous Members</h3>
            <PersonList people={alumni} />
          </div>

          <div className="peopleCard">
            <h3 className="cardHead">Awards</h3>
            {awards.map(({ event, results }) => (
              <div key={event} className="awardEvent">
                <div className="eventName">{event}</div>
                <ul>
                  {results.map(r => (
                    <li key={r.tournament + r.year + r.who} className="award">
                      <span className={parseInt(r.place) <= 8 ? 'place topPlace' : 'place'}>{r.place}<span className="placeOf">/{r.of}</span></span>
                      <span className="awardDetail">
                        <span className="awardName">{r.tournament}</span>
                        <span className="awardMeta">{r.who} · {r.year}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="peopleRight">
        <img src={tim_scarlett} alt="Tim and Scarlette at a tournament" className="peopleImg" />
      </div>
    </section>
  );
};

export default People;
