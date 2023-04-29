import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  Notification,
} from '@mantine/core'
import { IconAlertCircle, IconX } from '@tabler/icons-react'
import isEmail from 'validator/lib/isEmail'
import { setCookie } from 'cookies-next'
import styled from '@emotion/styled'

import { login } from '@/utils/api'

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

const NotificationWrapper = styled(Notification)`
  position: fixed;
  top: 0;
  width: 100%;

  & > .mantine-Notification-closeButton {
    display: none;
  }
}
`

export default function Login() {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const validateUsernameInput = () => {
    if (!username) {
      setUsernameErrorMsg('帳號尚未輸入')
      return false
    } else if (!isEmail(username)) {
      setUsernameErrorMsg('請輸入正確的Email格式')
      return false
    } else if (usernameErrorMsg) {
      setUsernameErrorMsg('')
    }
    return true
  }
  const onUsernameBlur = validateUsernameInput

  const validatePasswordInput = () => {
    if (!password) {
      setPasswordErrorMsg('密碼尚未輸入')
      return false
    } else if (password?.length < 3) {
      setPasswordErrorMsg('密碼輸入字數過少')
      return false
    } else if (passwordErrorMsg) {
      setPasswordErrorMsg('')
    }
    return true
  }
  const onPasswordBlur = validatePasswordInput

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState('')
  const notificationTimerRef = useRef(null)
  const onNotificationClose = () => {
    setNotificationMsg('')
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current)
    }
  }

  const onSignInClick = async () => {
    if (!validateUsernameInput(username) || !validatePasswordInput(password)) {
      return
    }
    setIsLoading(true)
    const [result, error] = await login(username, password)
    if (error) {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current)
      }
      setNotificationMsg(error.message)
      notificationTimerRef.current = setTimeout(() => {
        setNotificationMsg('')
      }, 4000)
    } else {
      setCookie('token', result.token)
      router.push('/')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    return () => {
      clearTimeout(notificationTimerRef.current)
    }
  }, [])

  return (
    <>
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
                <Button onClick={onSignInClick} disabled={isLoading}>
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
      {notificationMsg && (
        <NotificationWrapper>
          <Notification
            icon={<IconX size="1.1rem" />}
            color="red"
            onClose={onNotificationClose}
          >
            {notificationMsg}
          </Notification>
        </NotificationWrapper>
      )}
    </>
  )
}
