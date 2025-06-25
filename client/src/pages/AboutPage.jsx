import { useState } from 'react';
import teacher1 from '../assets/teacher1.jpg';
import teacher2 from '../assets/teacher2.jpg';
import teacher3 from '../assets/teacher3.jpg';
import '../styles/About.css';

const teachers = [
  {
    name: 'Shubham Kharka',
    subject: 'Mathematics',
    photo: teacher1,
    shortBio: '4x UGC-NET | Math & History Expert',
    fullBio: `✍️ MATHEMATICS AND HISTORY LECTURER IN MANDIYA P.G. COLLEGE - NEEMKATHANA, SIKAR (RAJASTHAN)

📌 B.Sc. - 2016 (RAJASTHAN UNIVERSITY)
📌 M.SC. - 2018 (DEPARTMENT OF MATHEMATICS, RAJASTHAN UNIVERSITY)
📌 M.A. - 2020 (HISTORY FROM SHEKHAWATI UNIVERSITY)
📌 B.Ed. - 2024
📌 4 TIMES UGC - NET & RAJ - SET`,
  },
  {
    name: 'Prof. Rajeev Mehta',
    subject: 'Chemistry',
    photo: teacher2,
    shortBio: 'Organic Chemistry made fun',
    fullBio: `M.Sc. Chemistry, Delhi University.

With over a decade of teaching experience, Prof. Mehta simplifies complex organic reactions using daily life analogies. Trusted by thousands of NEET and JEE aspirants.`,
  },
  {
    name: 'Mrs. Neha Verma',
    subject: 'Biology',
    photo: teacher3,
    shortBio: 'Life Sciences Expert',
    fullBio: `M.Sc. in Life Sciences (AIIMS), specializing in human physiology and genetics.

Her innovative diagrams and interactive style help students master complex biology topics with clarity and confidence.`,
  }
];

const AboutPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  return (
    <div className="about-container">
      <h2 className="about-heading">Meet Our Teachers</h2>

      <div className="teachers-grid">
        {teachers.map((teacher, index) => (
          <div
            className="teacher-card animate"
            key={index}
            onClick={() => setSelectedTeacher(teacher)}
            tabIndex="0"
          >
            <img src={teacher.photo} alt={teacher.name} className="teacher-photo" />
            <h3 className="teacher-name">{teacher.name}</h3>
            <p className="teacher-subject">{teacher.subject}</p>
            <p className="teacher-bio">{teacher.shortBio}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTeacher && (
        <div className="teacher-modal-backdrop" onClick={() => setSelectedTeacher(null)}>
          <div className="teacher-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTeacher(null)}>×</button>
            <img src={selectedTeacher.photo} className="modal-photo" alt={selectedTeacher.name} />
            <h2>{selectedTeacher.name}</h2>
            <p className="modal-subject">{selectedTeacher.subject}</p>
            <p className="modal-bio">
              {selectedTeacher.fullBio.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>What Our Students Say</h3>
        <div className="testimonial-card">
          <p>“The math teacher made calculus feel like a cakewalk. Visuals + clarity = 💯.”</p>
          <div className="author">— Riya, Class 12</div>
        </div>
        <div className="testimonial-card">
          <p>“Never thought physics could be fun until I joined these classes. Loved the animations!”</p>
          <div className="author">— Aryan, Class 11</div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
