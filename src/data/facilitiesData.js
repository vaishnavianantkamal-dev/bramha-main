const facilitiesData = [
  {
    id: 1,
    slug: "academic-instructions",
    navLabel: "Academic Instructions",
    title: "Academic Instructions",
    kicker: "Modern Learning Infrastructure",
    image: "/images/facilities/academic.jpeg",
    description:
      "Our institutions are committed to delivering excellence in education through modern infrastructure and innovative learning environments. We ensure that every student has access to world-class academic resources, helping them achieve their career goals and personal growth.",
    points: [
      "E-Learning Resources: Students have access to digital learning platforms like NPTEL, online journals, and e-library portals. These resources are available 24x7, enabling self-paced learning and exposure to global knowledge networks.",
      "Well-Equipped Laboratories: Each department is supported by state-of-the-art laboratories designed in compliance with AICTE and MSBTE norms. These labs include the latest tools, instruments, and software for practical learning.",
      "Central and Departmental Libraries: Our central and departmental libraries provide textbooks, reference books, national and international journals, magazines, e-books, and digital resources with quiet study areas and computer terminals.",
      "Smart Classrooms: Classrooms are integrated with digital boards, multimedia projectors, and audio-visual aids to make learning interactive and engaging.",
      "Workshops and Skill Development Labs: Dedicated spaces for technical workshops, skill enhancement programs, and practical training help students build industry-relevant competencies.",
      "Seminar and Conference Halls: Seminar and conference halls with advanced audio-visual systems are used for guest lectures, symposiums, cultural activities, and student presentations.",
      "Computer Center: The computer center offers high-speed internet, licensed software, and modern systems for projects, coding practice, and research activities.",
    ],
  },
  {
    id: 2,
    slug: "sports-facilities",
    navLabel: "Sports Facilities",
    title: "Sports Facilities",
    kicker: "Athletics and Student Fitness",
    image: null,
    description:
      "Sports facilities information will be updated soon. The section remains available so content can be published without changing page structure.",
    points: [],
  },
  {
    id: 3,
    slug: "medical-facilities",
    navLabel: "Medical Facilities",
    title: "Medical Facilities",
    kicker: "Health and Well-being",
    image: "/images/facilities/hospital.jpg",
    description:
      "The health and well-being of our students and staff are a top priority. Our institution ensures the availability of essential medical services and quick access to healthcare support within the campus.",
    points: [
      "On-campus first aid center with essential supplies for injuries, ailments, and emergencies.",
      "Visiting doctor service for regular check-ups, consultations, and preventive care.",
      "Hospital tie-ups for specialized treatment and advanced medical care.",
      "24x7 ambulance support for urgent transfers during emergencies.",
    ],
  },
  {
    id: 4,
    slug: "transport-facilities",
    navLabel: "Transport Facilities",
    title: "Transport Facilities",
    kicker: "Safe and Reliable Commute",
    image: "/images/facilities/transport.jpg",
    description:
      "To ensure convenient and safe travel for students and staff, the campus provides a reliable transport system connecting nearby towns and city routes with a focus on comfort and punctuality.",
    points: [
      "College buses serving major routes for smooth daily commuting.",
      "GPS-enabled vehicles for live location tracking and better safety.",
      "Regular maintenance and inspections to meet quality and safety standards.",
      "Operational planning that minimizes travel barriers to education.",
    ],
  },
  {
    id: 5,
    slug: "hostel-facilities",
    navLabel: "Hostel Facilities",
    title: "Hostel Facilities",
    kicker: "Secure Campus Living",
    image: "/images/facilities/hostel.jpg",
    description:
      "Our campus offers comfortable and secure hostel accommodation that supports both academic focus and personal growth in a disciplined, student-friendly environment.",
    points: [
      "Separate hostels for boys and girls managed by experienced wardens.",
      "Hygienic mess facility with nutritious vegetarian meals.",
      "24x7 Wi-Fi access for academic work, research, and communication.",
      "Common recreational spaces for relaxation and social engagement.",
      "Round-the-clock security with surveillance and monitored entry points.",
    ],
  },
];

export const facilitiesBySlug = facilitiesData.reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});

export default facilitiesData;
