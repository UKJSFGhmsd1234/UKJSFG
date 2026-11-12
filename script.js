const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');revealObserver.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.section,.join').forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll('section[id]')],navLinks=[...document.querySelectorAll('.nav nav a[href^="#"]')];
const setActive=()=>{let current='home';const offset=window.scrollY+130;sections.forEach(s=>{if(s.offsetTop<=offset)current=s.id});navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))};
setActive();window.addEventListener('scroll',setActive,{passive:true});


/* =========================================
   UKJSFG — INTERACTIVE UNIT PROFILES
   ========================================= */

const unitProfiles = {
  "unit-sas": {
    title: "SPECIAL AIR SERVICE (SAS)",
    description:
      "The SAS is UKJSFG's specialist ground element, focusing on challenging small-team operations, reconnaissance and direct-action scenarios.",
    duties: [
      "Specialist ground operations",
      "Reconnaissance and intelligence gathering",
      "Small-team coordination",
      "Joint operations with other UKJSFG units"
    ],
    roles: "Rifleman, Medic, Recce, Sniper, Engineer / EOD"
  },

  "unit-sbs": {
    title: "SPECIAL BOAT SERVICE (SBS)",
    description:
      "The SBS is UKJSFG's maritime specialist element, conducting amphibious operations, coastal reconnaissance and specialist missions.",
    duties: [
      "Maritime and coastal operations",
      "Amphibious insertion and extraction",
      "Specialist reconnaissance",
      "Joint special forces operations"
    ],
    roles: "Rifleman, Medic, Recce, Sniper, Engineer / EOD"
  },

  "unit-srr": {
    title: "SPECIAL RECONNAISSANCE REGIMENT (SRR)",
    description:
      "The SRR specialises in surveillance, intelligence gathering and reconnaissance, supporting UKJSFG operations through detailed observation and reporting.",
    duties: [
      "Covert surveillance scenarios",
      "Intelligence gathering",
      "Target identification",
      "Plain-clothes reconnaissance operations"
    ],
    roles: "Recce, Sniper, Rifleman"
  },

  "unit-para": {
    title: "PARACHUTE REGIMENT",
    description:
      "The Parachute Regiment provides UKJSFG with an airborne infantry element capable of rapid deployment and coordinated ground operations.",
    duties: [
      "Airborne operations",
      "Rapid deployment",
      "Infantry manoeuvres",
      "Securing and defending objectives"
    ],
    roles: "Rifleman, Medic, Gunner, AT, Recce"
  },

  "unit-marines": {
    title: "ROYAL MARINE COMMANDOS",
    description:
      "The Royal Marine Commandos provide versatile commando infantry capabilities for ground, coastal and amphibious missions.",
    duties: [
      "Amphibious operations",
      "Commando infantry missions",
      "Coastal reconnaissance",
      "Joint operations"
    ],
    roles: "Rifleman, Medic, Gunner, AT, Recce"
  },

  "unit-raf": {
    title: "RAF REGIMENT",
    description:
      "The RAF Regiment provides ground combat and force protection capabilities, supporting UKJSFG aviation and deployed operations.",
    duties: [
      "Airfield defence",
      "Force protection",
      "Landing-zone security",
      "Ground patrols"
    ],
    roles: "Rifleman, Medic, Gunner, AT"
  },

  "unit-flight": {
    title: "658 SQUADRON — FLIGHT",
    description:
      "658 Squadron provides UKJSFG with aviation support, including troop transport, aerial reconnaissance and operational insertion and extraction.",
    duties: [
      "Helicopter transport",
      "Troop insertion and extraction",
      "Aerial reconnaissance",
      "Air-to-ground coordination"
    ],
    roles: "Pilot, Co-Pilot, Aircrew"
  }
};

// Connect clickable unit text to profiles
const unitModal = document.getElementById("unit-modal");

document.querySelectorAll(".unit-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const unitId = link.getAttribute("href").substring(1);
    const unit = unitProfiles[unitId];

    if (!unit || !unitModal) return;

    document.getElementById("unit-modal-title").textContent =
      unit.title;

    document.getElementById("unit-modal-description").textContent =
      unit.description;

    document.getElementById("unit-modal-roles").textContent =
      unit.roles;

    const dutiesList = document.getElementById("unit-modal-duties");
    dutiesList.replaceChildren();

    unit.duties.forEach(duty => {
      const item = document.createElement("li");
      item.textContent = duty;
      dutiesList.appendChild(item);
    });

    unitModal.showModal();
  });
});

// Close using the X button
document.querySelector(".unit-modal-close")
  ?.addEventListener("click", () => {
    unitModal.close();
  });

// Close when clicking outside the panel
unitModal?.addEventListener("click", event => {
  if (event.target === unitModal) {
    unitModal.close();
  }
});
