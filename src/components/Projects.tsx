import React from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="text-left max-w-3xl mx-auto mt-12">
      <p className="font-bold text-lg">Check out my other projects:</p>
      <div className="grid grid-cols-2 mt-6 gap-8">
        <ProjectCard
          title="ManhuarockZ"
          description="Web đọc truyện tranh"
          image="/projects/share.png"
          link="https://manhuarockz.com/"
        />
      </div>
    </div>
  );
}

export default Projects;
