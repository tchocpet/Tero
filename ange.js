// demo dataset
const jobs = [
  {
    title: "Software Engineer",
    location: "Essen",
    date: "08.06.2023",
    type: "Full-time",
  },
  {
    title: "Web Developer",
    location: "Essen",
    date: "01.01.2024",
    type: "Part-time",
  },
  {
    title: "Frontend Developer",
    location: "Mülheim",
    date: "01.01.2024",
    type: "Full-time",
  },
  {
    title: "Backend Developer",
    location: "Düsseldorf",
    date: "01.01.2024",
    type: "Full-time",
  },
  {
    title: "Fullstack Developer",
    location: "Düsseldorf",
    date: "01.01.2024",
    type: "Mini-job",
  },
  {
    title: "Software Engineer",
    location: "Essen",
    date: "01.02.2024",
    type: "Part-time",
  },
  {
    title: "Software Engineer",
    location: "Bottrop",
    date: "01.01.2024",
    type: "Full-time",
  },
  {
    title: "Software Engineer",
    location: "Köln",
    date: "01.03.2024",
    type: "Mini-Job",
  },
  {
    title: "Software Engineer",
    location: "Köln",
    date: "01.01.2024",
    type: "Full-time",
  },
  {
    title: "Software Engineer",
    location: "Essen",
    date: "11.01.2024",
    type: "Part-time",
  },
  {
    title: "Software Engineer",
    location: "Moers",
    date: "21.01.2024",
    type: "Full-time",
  },
  {
    title: "Software Engineer",
    location: "Dortmund",
    date: "10.02.2024",
    type: "Full-time",
  },
  {
    title: "Software Engineer",
    location: "Köln",
    date: "21.02.2024",
    type: "Full-time",
  },
];

function filterJobs() {
  const titleInput = document.getElementById("jobTitle").value.toLowerCase();
  const locationInput = document.getElementById("location").value.toLowerCase();

  let filteredJobs;

  // Check if both fields are empty
  if (titleInput === "" && locationInput === "") {
    filteredJobs = jobs; // Display all jobs
  } else {
    filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(titleInput) &&
        job.location.toLowerCase().includes(locationInput)
    );
  }

  displayJobs(filteredJobs);
}

function displayJobs(jobs) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (jobs.length === 0) {
    resultsContainer.innerHTML =
      '<p  style="text-align: center; margin-top : 2rem">No jobs found</p>';
  } else {
    jobs.forEach((job) => {
      // Creating main job item container
      const jobElement = document.createElement("div");
      jobElement.className = "job-item mb-1";

      // Creating and filling the job title
      const titleElement = document.createElement("h3");
      titleElement.className = "jobTitle";
      titleElement.id = "jobTitle";
      titleElement.innerText = job.title;

      // Creating the container for job details
      const detailsContainer = document.createElement("div");
      detailsContainer.className = "d-flex flex-row gap-3";

      // Job Location
      const locationContainer = document.createElement("div");
      locationContainer.className = "fw-bold";
      const locationIcon = document.createElement("span");
      locationIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
      const locationText = document.createElement("p");
      locationText.id = "jobLocation";
      locationText.innerText = job.location;
      locationContainer.appendChild(locationIcon);
      locationContainer.appendChild(locationText);

      // Job Date
      const dateContainer = document.createElement("div");
      dateContainer.className = "fw-bold";
      const dateIcon = document.createElement("span");
      dateIcon.innerHTML = '<i class="fa-solid fa-calendar-days"></i>';
      const dateText = document.createElement("p");
      dateText.className = "jobDate";
      dateText.innerText = job.date;
      dateContainer.appendChild(dateIcon);
      dateContainer.appendChild(dateText);

      // Job Type
      const typeContainer = document.createElement("div");
      typeContainer.className = "fw-bold";
      const typeIcon = document.createElement("span");
      typeIcon.innerHTML = '<i class="fa-solid fa-suitcase"></i>';
      const typeText = document.createElement("p");
      typeText.className = "jobType";
      typeText.innerText = job.type;
      typeContainer.appendChild(typeIcon);
      typeContainer.appendChild(typeText);

      // Assembling the details container
      detailsContainer.appendChild(locationContainer);
      detailsContainer.appendChild(dateContainer);
      detailsContainer.appendChild(typeContainer);

      // Assembling the main job item
      jobElement.appendChild(titleElement);
      jobElement.appendChild(detailsContainer);

      resultsContainer.appendChild(jobElement);
    });
  }
}

// loading full list initially
window.onload = () => displayJobs(jobs);
