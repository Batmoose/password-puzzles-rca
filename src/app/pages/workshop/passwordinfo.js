import React from 'react'
import { Segment, Label, Icon, Container, Header } from 'semantic-ui-react'
const PasswordInfo = ({ word, icon, labelContent, color }) =>
  <Segment attached size='large'>
    <Label color={color} size='small' ribbon>
      <Icon name={icon} />
      {labelContent}
    </Label>
    <br />
    {word}
  </Segment>
PasswordInfo.Group = ({ info, crackTime, isSecure, ...props }) => {
  return (
    <Container>
      {
        !info.password.length
          ? <Header size='tiny'>Start typing to see a breakdown of your passsword</Header>
          : <Header size='tiny' color={isSecure ? 'green' : 'red'}>Your password {isSecure ? 'is' : "isn't"} secure</Header>
      }
      <Segment.Group {...props}>{
        info.sequence.map((details, i) =>
          <PasswordInfo key={i} {...patternMap[details.pattern](details)} />
        )
      }
      </Segment.Group>
    </Container>
  )
}
const patternMap = {
  dictionary ({ token, dictionary_name: dictionaryName }) {
    const labelMap = {
      'male_names': 'name',
      'us_tv_and_film': 'known phrase',
      'surnames': 'name',
      'female_names': 'name',
      'english_wikipedia': 'known word',
      'passwords': 'known password'
    }
    return {
      icon: 'book',
      labelContent: labelMap[dictionaryName],
      color: 'red',
      word: token
    }
  },
  spatial ({ token }) {
    return {
      icon: 'keyboard outline',
      labelContent: 'close keys',
      color: 'red',
      word: token
    }
  },
  date ({ token, day, month, year }) {
    return {
      icon: 'calendar alternate outline',
      labelContent: `date ${month}${(day && `/${day}/`) || ''}${year}`,
      color: 'red',
      word: token
    }
  },
  bruteforce ({ token }) {
    return {
      icon: 'check',
      labelContent: 'no pattern',
      color: 'green',
      word: token
    }
  },
  sequence ({ token, sequence_name: sequenceName, ascending }) {
    const iconMap = {
      'upper': 'sort alphabet',
      'lower': 'sort alphabet',
      'digits': 'sort numeric'
    }
    return {
      icon: `${iconMap[sequenceName]} ${ascending ? 'ascending' : 'descending'}`,
      labelContent: 'in order',
      color: 'red',
      word: token
    }
  },
  regex ({ token, regex_name: regexName }) {
    return {
      icon: 'calendar',
      labelContent: 'recent year',
      color: 'red',
      word: token
    }
  },
  repeat ({ repeat_count: repeatCount, base_token: baseToken }) {
    return {
      icon: 'repeat',
      labelContent: `repeats ${repeatCount}x`,
      color: 'red',
      word: baseToken
    }
  }
}
export default PasswordInfo
