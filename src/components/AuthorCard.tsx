import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled, { css } from 'react-emotion';
import { colors } from '../styles/colors';
import { lighten } from 'polished';

const AuthorCardSection = styled.section`
  display: flex;
`;

const AuthorProfileImage = css`
  display: block;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;
  margin-right: 15px;
  width: 60px;
  height: 60px;
`;

const AuthorCardName = styled.h4`
  margin: 8px 0 2px 0;
  padding: 0;
  font-size: 2rem;

  a {
    color: var(--darkgrey);
    font-weight: 700;
  }

  a:hover {
    text-decoration: none;
  }
`;

const AuthorCardContent = styled.section`
  p {
    margin: 0;
    color: ${colors.midgrey};
    line-height: 1.3em;
  }
`;

export interface AuthorCardProps {
  author: any;
}

const AuthorCard: React.SFC<AuthorCardProps> = ({ author }) => {
  return (
    <AuthorCardSection>
      {/* TODO: default avatar */}
      {/* TODO: author page url */}
      <img className={`${AuthorProfileImage}`} src={author.avatar.children[0].fixed.src} alt={author.id} />
      <AuthorCardContent>
        <AuthorCardName>
          <Link to={`/author/${_.kebabCase(author.id)}/`}>{author.id}</Link>
        </AuthorCardName>
        {author.bio ? (
          <p>{author.bio}</p>
        ) : (
          <p>
            Read <Link to={`/author/${_.kebabCase(author.id)}/`}>more posts</Link> by this author.
          </p>
        )}
      </AuthorCardContent>
    </AuthorCardSection>
  );
};

export default AuthorCard;
