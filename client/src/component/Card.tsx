import React from 'react';
import s from './styles.pcss';

interface Props {
  imageUrl: string;
  name: string;
  email: string;
  type: string;
}

export const Card = ({
  imageUrl,
  name,
  email,
  type
}: Props) => {
  return (
    <div className={s.card}>
      <div className={s.header}>
        <img className={s.thumbnail} src={imageUrl} alt='이소영의 깃헙 프로필'/>
        <div className={s.headerData}>
          <h4 style={{
            color: '#5b5c5c',
            fontSize: '16px'
          }}>{name}</h4>
          <span>{email}</span>
        </div>
      </div>
      <div className={s.body}>
        <dl>
          <dt className={s.term}>타입</dt>
          <dd className={s.typeValue}>{type}</dd>
        </dl>
      </div>
    </div>
  )
}
