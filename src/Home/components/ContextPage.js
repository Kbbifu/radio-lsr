import React, { createContext, useState } from 'react';

export const DataContext = React.createContext();

function ContextPage(props) {
  // const array = [
  //   (news = [
  //     {
  //       id: '1',
  //       title: '',
  //       image: '',
  //       content: '',
  //     },
  //   ]),
  //   (presenters = [
  //     {
  //       id: '1',
  //       name: '',
  //       image: '',
  //       bio: '',
  //     },
  //   ]),
  //   (television = [
  //     {
  //       id: '1',
  //       title: '',
  //       image: '',
  //       content: '',
  //     },
  //   ]),
  //   (shows = [
  //     {
  //       id: '1',
  //       title: '',
  //       image: '',
  //     },
  //   ]),
  // ];
  const [book, setBook] = useState([
    [
      {
        id: 1,
        title: 'Things fall Apart',
        author: 'Chinua Achebe',
        description:
          'The novel follows the life of Okonkwo, an Igbo ("Ibo" in the novel) man and local wrestling champion in the fictional Nigerian clan of Umuofia. The work is split into three parts, with the first describing his family, personal history, and the customs and society of the Igbo, and the second and third sections introducing the influence of European colonialism and Christian missionaries on Okonkwo, his family, and the wider Igbo community.',
      },
      {
        id: 2,
        title: 'Harry Potter: and the Chamber of Secrets',
        author: 'J. K. Rowling',
        description:
          "The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's corridors warn that the 'Chamber of Secrets' has been opened and that the 'heir of Slytheri' would kill all pupils who do not come from all-magical families. These threats are found after attacks that leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks.",
      },
      {
        id: 3,
        title: 'Americanah',
        author: 'Chimamanda Ngozi Adichie',
        description:
          "Americanah tells the story of a young Nigerian woman, Ifemelu, who immigrates to the United States to attend university. The novel traces Ifemelu's life in both countries, threaded by her love story with high school classmate Obinze.",
      },
      {
        id: 4,
        title: 'Gifted Hands',
        author: 'Ben Carson',
        description:
          'Gifted Hands by and about Ben Carson, M.D., is the inspiring story of an inner-city kid with poor grades and little motivation, who, at age thirty-three, became director of pediatric neurosurgery at Johns Hopkins University Hospital. Gifted Hands will transplace you into the operating room to witness surgeries that made headlines around the world, and into the private mind of a compassionate, God-fearing physician who lives to help others. In 1987, Dr. Carson gained worldwide recognition for his part in the first successful separation of Siamese twins joined at the back of the head -- an extremely complex and delicate operation that was five months of planning and twenty-two hours of actual surgery, involving a surgical plan that Carson helped initiate. Gifted Hands reveals a man with humility, decency, compassion, courage, and sensitivity who serves as a role model for young people (and everyone else) in need of encouragement to attempt the seemingly impossible and to excel in whatever they attempt. Dr. Carson also describes the key role that his highly intelligent though relatively uneducated mother played in his metamorphosis from an unmotivated ghetto youngster into one of the most respected neurosurgeons in the world.',
      },
      {
        id: 5,
        title: 'Me Before You',
        author: 'Jojo Moyes',
        description:
          "Twenty-six-year-old Louisa Clark lives with her working-class family. Unambitious and with few qualifications, she feels constantly outshone by her younger sister, Treena, an outgoing single mother. Louisa, who helps support her family, loses her job at a local café when the café closes. She goes to the Job Center and, after several failed attempts, is offered a unique employment opportunity: help care for Will Traynor, a successful, wealthy, and once-active young man who has quadriplegia as a result of a pedestrian-motorcycle accident two years earlier. Will's mother, Camilla, hires Louisa despite her lack of experience, believing Louisa can brighten his spirit. Louisa meets Nathan, who cares for Will's medical needs, and Will's father, Steven, a friendly upper-class businessman whose marriage to Camilla is strained.",
      },
    ],
  ]);
    const myBooks = [
      {
        id: 1,
        title: 'Things fall Apart',
        author: 'Chinua Achebe',
        description:
          'The novel follows the life of Okonkwo, an Igbo ("Ibo" in the novel) man and local wrestling champion in the fictional Nigerian clan of Umuofia. The work is split into three parts, with the first describing his family, personal history, and the customs and society of the Igbo, and the second and third sections introducing the influence of European colonialism and Christian missionaries on Okonkwo, his family, and the wider Igbo community.',
      },
      {
        id: 2,
        title: 'Harry Potter: and the Chamber of Secrets',
        author: 'J. K. Rowling',
        description:
          "The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's corridors warn that the 'Chamber of Secrets' has been opened and that the 'heir of Slytheri' would kill all pupils who do not come from all-magical families. These threats are found after attacks that leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks.",
      },
      {
        id: 3,
        title: 'Americanah',
        author: 'Chimamanda Ngozi Adichie',
        description:
          "Americanah tells the story of a young Nigerian woman, Ifemelu, who immigrates to the United States to attend university. The novel traces Ifemelu's life in both countries, threaded by her love story with high school classmate Obinze.",
      },
      {
        id: 4,
        title: 'Gifted Hands',
        author: 'Ben Carson',
        description:
          'Gifted Hands by and about Ben Carson, M.D., is the inspiring story of an inner-city kid with poor grades and little motivation, who, at age thirty-three, became director of pediatric neurosurgery at Johns Hopkins University Hospital. Gifted Hands will transplace you into the operating room to witness surgeries that made headlines around the world, and into the private mind of a compassionate, God-fearing physician who lives to help others. In 1987, Dr. Carson gained worldwide recognition for his part in the first successful separation of Siamese twins joined at the back of the head -- an extremely complex and delicate operation that was five months of planning and twenty-two hours of actual surgery, involving a surgical plan that Carson helped initiate. Gifted Hands reveals a man with humility, decency, compassion, courage, and sensitivity who serves as a role model for young people (and everyone else) in need of encouragement to attempt the seemingly impossible and to excel in whatever they attempt. Dr. Carson also describes the key role that his highly intelligent though relatively uneducated mother played in his metamorphosis from an unmotivated ghetto youngster into one of the most respected neurosurgeons in the world.',
      },
      {
        id: 5,
        title: 'Me Before You',
        author: 'Jojo Moyes',
        description:
          "Twenty-six-year-old Louisa Clark lives with her working-class family. Unambitious and with few qualifications, she feels constantly outshone by her younger sister, Treena, an outgoing single mother. Louisa, who helps support her family, loses her job at a local café when the café closes. She goes to the Job Center and, after several failed attempts, is offered a unique employment opportunity: help care for Will Traynor, a successful, wealthy, and once-active young man who has quadriplegia as a result of a pedestrian-motorcycle accident two years earlier. Will's mother, Camilla, hires Louisa despite her lack of experience, believing Louisa can brighten his spirit. Louisa meets Nathan, who cares for Will's medical needs, and Will's father, Steven, a friendly upper-class businessman whose marriage to Camilla is strained.",
      },
    ];
  return <div>
    <DataContext.Provider value={{book}}>
      {props.children}
    </DataContext.Provider>
  </div>;
}

export default ContextPage;
