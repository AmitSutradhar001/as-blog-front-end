import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About AsBlog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to AsBlog! I&rsquo;m Amit Sutradhar, a passionate web
              developer with skills in React, Tailwind CSS, Express.js,
              JavaScript, Node.js, MongoDB, and Figma. I recently completed a
              2-month internship in frontend development, and I created this
              blog as a platform to share my journey, projects, and thoughts on
              web development.
            </p>

            <p>
              AsBlog is a place where you&rsquo;ll find articles on web
              development, programming, and the latest in tech. I aim to create
              a community where developers and enthusiasts can learn and grow
              together.
            </p>

            <p>
              The blog offers several features: users can browse posts without
              logging in, but to engage by commenting and liking, they need to
              sign up. Admins have full control over the site, including the
              ability to create, edit, and delete posts, manage comments, and
              oversee all users.
            </p>

            <p>
              Whether you&rsquo;re here to learn, share, or just explore new
              ideas, I hope AsBlog provides valuable insights. Feel free to
              reach out, leave comments, and engage with the content. Let’s
              build a community of learners and creators!
            </p>

            {/* Attractive Link to Source Code */}
            <div className="my-6">
              <Link
                to="https://github.com/AmitSutradhar001/AsBlog" // Replace with your repo link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105 hover:from-purple-500 hover:to-blue-500"
              >
                View Source Code on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
