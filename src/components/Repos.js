import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie, Column, Bar, Doughnut } from './Charts';

const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    // if language === null then return the object (total)
    if (!language) {
      return total;
    }
    // !total[language] if language property is not on the object then create new one as an object
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
      // if the language is already exists
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // Object.values convert the object to Array of objects.
  // slice for using the must 5 popular languages
  //The following function will sort the array in ascending order.
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // Stars
  const stars = repos
    .map((item) => {
      const { stargazers_count, name } = item;
      return { label: name, value: stargazers_count };
    })
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // Forks
  const popularForks = repos
    .map((item) => {
      const { forks, name } = item;
      return { label: name, value: forks };
    })
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie data={mostUsed} />
        <Column data={stars} />
        <Doughnut data={mostPopular} />
        <Bar data={popularForks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
