import { useState } from 'react'
import {
  Grid,
  Center,
  Paper,
  Box,
  Button,
  Text,
  TextInput,
  ActionIcon,
  Checkbox,
  Flex,
  Space,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import isEmail from 'validator/lib/isEmail'
import styled from '@emotion/styled'

const StyledGrid = styled(Grid)`
  height: 100vh;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
`

const Wrapper = styled(Paper)`
  width: 400px;
  max-width: 100%;
`

const RememberMeCheckbox = styled(Checkbox)`
  .mantine-Checkbox-label {
    color: ${({ theme }) => theme.colors.gray[5]};
  }
}
`

const A = styled.a`
  color: ${({ theme }) => theme.colors.blue[8]};
  text-decoration: none;
`

export default function Login() {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameBlur = () => {
    if (!username) {
      setUsernameErrorMsg('帳號尚未輸入')
    } else if (!isEmail(username)) {
      setUsernameErrorMsg('請輸入正確的Email格式')
    } else if (usernameErrorMsg) {
      setUsernameErrorMsg('')
    }
  }

  const onPasswordBlur = () => {
    if (!password) {
      setPasswordErrorMsg('密碼尚未輸入')
    } else if (password?.length < 3) {
      setPasswordErrorMsg('密碼輸入字數過少')
    } else if (passwordErrorMsg) {
      setPasswordErrorMsg('')
    }
  }

  return (
    <StyledGrid gutter={0}>
      <Grid.Col span={6}>
        <Center h="100%">
          <Wrapper shadow="sx" p="md" withBorder>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.black,
                color: theme.white,
                textAlign: 'center',
                padding: '6px 0',
                letterSpacing: '2px',
              })}
            >
              LOGO
            </Box>

            <Space h="lg" />
            <Text size="xl" ta="center">
              Sign In
            </Text>
            <Text c="gray.5" ta="center">Sign in to stay connected</Text>
            <Space h="lg" />

            <TextInput
              label="Username"
              inputWrapperOrder={['label', 'input', 'description', 'error']}
              error={usernameErrorMsg}
              rightSection={
                usernameErrorMsg && (
                  <div>
                    <ActionIcon variant="transparent" color="red">
                      <IconAlertCircle size="1rem" />
                    </ActionIcon>
                  </div>
                )
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={onUsernameBlur}
            />
            <Space h="sm" />

            <TextInput
              type="password"
              label="Password"
              inputWrapperOrder={['label', 'input', 'description', 'error']}
              error={passwordErrorMsg}
              rightSection={
                passwordErrorMsg && (
                  <div>
                    <ActionIcon variant="transparent" color="red">
                      <IconAlertCircle size="1rem" />
                    </ActionIcon>
                  </div>
                )
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={onPasswordBlur}
            />

            <Space h="md" />
            <Grid justify="space-between" align="center">
              <Grid.Col span={6}>
                <RememberMeCheckbox
                  label="Remember me?"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Box sx={{ textAlign: 'end' }}>
                  <A href="">Forgot password</A>
                </Box>
              </Grid.Col>
            </Grid>
            <Space h="md" />

            <Flex justify="center">
              <Button>
                Sign In
              </Button>
            </Flex>
          </Wrapper>
        </Center>
      </Grid.Col>
      <Grid.Col span={6}>
        <Img src="/Graphic_Side.jpeg" />
      </Grid.Col>
    </StyledGrid>
  )
}
