const fetch = require('node-fetch');

const programs = [
  {
    name: 'Internship',
    description: 'Join our internship program to gain hands-on experience in community-based tourism and cultural preservation. Work alongside local communities and learn about sustainable tourism practices.',
    schedule: 'Flexible scheduling available',
  },
  {
    name: 'Research',
    description: 'Participate in research programs focused on cultural heritage, community development, and sustainable tourism. Contribute to academic studies while experiencing authentic Rwandan culture.',
    schedule: 'Research periods available year-round',
  },
  {
    name: 'Giving goat to local communities',
    description: 'Support local communities through our goat donation program. Help improve livelihoods and support sustainable agriculture practices in rural Rwanda.',
    schedule: 'Ongoing community support program',
  },
  {
    name: 'Helping local communities keeping bees',
    description: 'Learn about traditional beekeeping practices and help local communities establish sustainable beekeeping operations. Support environmental conservation and community development.',
    schedule: 'Seasonal program aligned with honey production',
  },
  {
    name: 'Local Communities Hiking',
    description: 'Experience authentic community life through guided hiking tours led by local community members. Learn about traditional ways of life while exploring Rwanda\'s beautiful landscapes.',
    schedule: 'Daily tours available',
  },
];

async function addPrograms() {
  for (const program of programs) {
    try {
      const res = await fetch('http://localhost:3000/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(program),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error(`Failed to add ${program.name}:`, err);
      } else {
        console.log(`Added: ${program.name}`);
      }
    } catch (e) {
      console.error(`Error adding ${program.name}:`, e);
    }
  }
}

addPrograms();

