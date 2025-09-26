import React, { useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * LoginPage component renders a centered, modern login UI using the "Ocean Professional" theme.
 * UI only: includes client-side validation states and visual feedback for success/error.
 */
function LoginPage() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [touched, setTouched] = useState({ identifier: false, password: false });
  const [status, setStatus] = useState({ type: 'idle', message: '' }); // idle | success | error | loading

  const errors = useMemo(() => {
    const e = {};
    if (!form.identifier.trim()) {
      e.identifier = 'Please enter your email or username.';
    } else if (form.identifier.includes('@')) {
      // basic email shape validation if it looks like an email
      const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailLike.test(form.identifier.trim())) {
        e.identifier = 'Please enter a valid email address.';
      }
    }
    if (!form.password) {
      e.password = 'Please enter your password.';
    } else if (form.password.length < 6) {
      e.password = 'Password should be at least 6 characters.';
    }
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ identifier: true, password: true });

    if (!isValid) {
      setStatus({ type: 'error', message: 'Please fix the errors and try again.' });
      return;
    }

    // Simulate a UI-only "auth" flow with loading then success
    setStatus({ type: 'loading', message: 'Signing you in…' });
    setTimeout(() => {
      // flip a coin to simulate success/error feedback
      const flip = Math.random() > 0.2;
      if (flip) {
        setStatus({ type: 'success', message: 'Welcome back! Successfully authenticated.' });
      } else {
        setStatus({ type: 'error', message: 'Invalid credentials. Please try again.' });
      }
    }, 1000);
  };

  return (
    <div className="login-root">
      <div className="login-gradient-bg" aria-hidden="true" />
      <div className="login-card" role="main" aria-labelledby="loginTitle">
        <div className="login-header">
          <div className="login-badge">Ocean Professional</div>
          <h1 id="loginTitle" className="login-title">Sign in</h1>
          <p className="login-subtitle">Access your account with your email or username</p>
        </div>

        {/* Global status */}
        {status.type !== 'idle' && (
          <div
            className={`status-banner ${
              status.type === 'error'
                ? 'status-error'
                : status.type === 'success'
                ? 'status-success'
                : 'status-loading'
            }`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-field ${touched.identifier && errors.identifier ? 'has-error' : ''}`}>
            <label htmlFor="identifier">Email or Username</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="you@example.com"
              autoComplete="username"
              value={form.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.identifier && errors.identifier)}
              aria-describedby={touched.identifier && errors.identifier ? 'identifier-error' : undefined}
            />
            {touched.identifier && errors.identifier && (
              <div className="field-error" id="identifier-error">
                {errors.identifier}
              </div>
            )}
          </div>

          <div className={`form-field ${touched.password && errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
            />
            {touched.password && errors.password && (
              <div className="field-error" id="password-error">
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={status.type === 'loading'}
            aria-busy={status.type === 'loading'}
          >
            {status.type === 'loading' ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <button className="link-button" type="button">
            Forgot password?
          </button>
          <span className="divider" aria-hidden="true">•</span>
          <button className="link-button" type="button">
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
