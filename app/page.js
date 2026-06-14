'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState('/api/auth/login');
  
  const routes = [
    {
      category: 'Authentication',
      items: [
        { method: 'POST', path: '/api/auth/register', desc: 'Registers a new employee/staff member.', payload: '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "password": 123456,\n  "phoneNumber": 9876543210,\n  "role": "Employee",\n  "tasks": []\n}' },
        { method: 'POST', path: '/api/auth/login', desc: 'Authenticates user and returns JWT token.', payload: '{\n  "email": "john@example.com",\n  "password": 123456\n}' }
      ]
    },
    {
      category: 'Clients',
      items: [
        { method: 'GET', path: '/api/client/read', desc: 'Fetches all clients.', payload: null },
        { method: 'POST', path: '/api/client/create', desc: 'Creates a new client record.', payload: '{\n  "name": "Acme Corp",\n  "email": "contact@acme.com",\n  "phoneNumber": 1234567890,\n  "location": "New York",\n  "website": "acme.com"\n}' },
        { method: 'PUT', path: '/api/client/update?id={ID}', desc: 'Updates a client record by ID.', payload: '{\n  "name": "Acme Corp Updated",\n  "email": "contact@acme.com",\n  "phoneNumber": 1234567890,\n  "location": "New York",\n  "website": "acme.com"\n}' },
        { method: 'DELETE', path: '/api/client/delete?id={ID}', desc: 'Deletes a client record by ID.', payload: null }
      ]
    },
    {
      category: 'Staff (Auth Required)',
      items: [
        { method: 'GET', path: '/api/staff/read', desc: 'Fetches all employees.', payload: null },
        { method: 'POST', path: '/api/staff/create', desc: 'Creates a new staff member.', payload: '{\n  "name": "Jane Smith",\n  "email": "jane@example.com",\n  "password": 654321,\n  "phoneNumber": 9998887776,\n  "role": "Admin",\n  "tasks": []\n}' },
        { method: 'PUT', path: '/api/staff/update?id={ID}', desc: 'Updates an employee by ID.', payload: '{\n  "name": "Jane Smith Updated",\n  "email": "jane@example.com",\n  "password": 654321,\n  "phoneNumber": 9998887776,\n  "role": "Admin",\n  "tasks": []\n}' },
        { method: 'DELETE', path: '/api/staff/delete?id={ID}', desc: 'Deletes an employee by ID.', payload: null }
      ]
    },
    {
      category: 'Forms (Auth Required)',
      items: [
        { method: 'GET', path: '/api/form/read', desc: 'Fetches all forms.', payload: null },
        { method: 'POST', path: '/api/form/create', desc: 'Creates a new form definition.', payload: '{\n  "staffId": "65cbde...",\n  "title": "Monthly Report",\n  "fields": [\n    { "label": "Sales Volume", "fieldType": "number" }\n  ]\n}' },
        { method: 'PUT', path: '/api/form/update?id={ID}', desc: 'Updates form details.', payload: '{\n  "staffId": "65cbde...",\n  "title": "Monthly Report Updated",\n  "fields": [\n    { "label": "Sales Volume", "fieldType": "number" }\n  ]\n}' },
        { method: 'DELETE', path: '/api/form/delete?id={ID}', desc: 'Deletes form by ID.', payload: null }
      ]
    },
    {
      category: 'Views (Auth Required)',
      items: [
        { method: 'GET', path: '/api/view/read?id={FORM_ID}', desc: 'Fetches form builder details for display.', payload: null },
        { method: 'POST', path: '/api/view/create', desc: 'Submits form responses.', payload: '{\n  "staffId": "65cbde...",\n  "responses": { "Sales Volume": 250 }\n}' }
      ]
    }
  ];

  const currentRoute = routes.flatMap(r => r.items).find(i => i.path === selectedRoute) || routes[0].items[1];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at top right, #1e1b4b, #090a0f 60%)' }}>
      
      {/* Navbar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '18px',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
          }}>
            α
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', tracking: '-0.025em', background: 'linear-gradient(to right, #ffffff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ALPHA ENGINE
          </span>
          <span style={{
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: '#818cf8',
            fontSize: '11px',
            fontWeight: '600',
            padding: '2px 8px',
            borderRadius: '20px',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            Next.js API v2
          </span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#94a3b8' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Docs</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Github</a>
        </div>
      </header>

      {/* Hero Header */}
      <div style={{ padding: '60px 60px 40px 60px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', letterSpacing: '-0.03em', background: 'linear-gradient(to bottom right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Developer Dashboard
        </h1>
        <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0, maxWidth: '600px', lineHeight: '1.6' }}>
          Welcome to your new Next.js API developer portal. Run endpoints, configure middleware, and integrate client-side modules seamlessly.
        </p>
      </div>

      {/* Main Grid */}
      <main style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto 60px auto',
        width: '100%',
        padding: '0 60px',
        boxSizing: 'border-box'
      }}>
        
        {/* Left Side: Route List */}
        <section style={{
          background: 'rgba(15, 23, 42, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxHeight: 'calc(100vh - 280px)',
          overflowY: 'auto'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>API Endpoints</h2>
          
          {routes.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', tracking: '0.05em', color: '#6366f1' }}>
                {cat.category}
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cat.items.map((item, itemIdx) => {
                  const isActive = selectedRoute === item.path;
                  const methodColors = {
                    GET: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },
                    POST: { bg: 'rgba(99, 102, 241, 0.1)', text: '#6366f1' },
                    PUT: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
                    DELETE: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }
                  };
                  const color = methodColors[item.method] || { bg: 'rgba(255,255,255,0.1)', text: '#fff' };
                  
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => setSelectedRoute(item.path)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                        border: '1px solid',
                        borderColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: color.bg,
                          color: color.text,
                          fontFamily: 'monospace'
                        }}>
                          {item.method}
                        </span>
                        <span style={{ fontSize: '13px', color: isActive ? '#fff' : '#94a3b8', fontWeight: isActive ? '600' : '400', fontFamily: 'monospace' }}>
                          {item.path.split('?')[0]}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#475569' }}>→</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Right Side: Details & curl */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card Details */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '32px',
            backdropFilter: 'blur(8px)'
          }}>
            <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '800', textTransform: 'uppercase', tracking: '0.1em' }}>
              Endpoint Details
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', margin: '8px 0 12px 0', fontFamily: 'monospace' }}>
              {currentRoute.path}
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 24px 0', lineHeight: '1.6' }}>
              {currentRoute.desc}
            </p>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Headers:</span>
              <pre style={{
                margin: '8px 0 0 0',
                padding: '12px',
                background: '#040508',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                fontSize: '12px',
                color: '#cbd5e1',
                fontFamily: 'monospace'
              }}>
                {`Content-Type: application/json\n${currentRoute.path.includes('auth') ? '' : 'Authorization: Bearer <your_jwt_token>'}`}
              </pre>
            </div>

            {currentRoute.payload && (
              <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Request Body Payload:</span>
                <pre style={{
                  margin: '8px 0 0 0',
                  padding: '16px',
                  background: '#040508',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '12px',
                  color: '#10b981',
                  fontFamily: 'monospace',
                  overflowX: 'auto'
                }}>
                  {currentRoute.payload}
                </pre>
              </div>
            )}
          </div>

          {/* curl command generator */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <h4 style={{ fontSize: '14px', color: '#fff', margin: '0 0 12px 0', fontWeight: '700' }}>Example curl Request</h4>
            <pre style={{
              margin: 0,
              padding: '16px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)',
              fontSize: '12px',
              color: '#a5b4fc',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}>
              {`curl -X ${currentRoute.method} http://localhost:9090${currentRoute.path} \\
  -H "Content-Type: application/json" \\${currentRoute.path.includes('auth') ? '' : '\n  -H "Authorization: Bearer <token>" \\'}${currentRoute.payload ? `\n  -d '${currentRoute.payload.replace(/\n/g, '')}'` : ''}`}
            </pre>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px',
        fontSize: '12px',
        color: '#475569',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        marginTop: 'auto'
      }}>
        © 2026 Alpha Systems. Powered by Next.js and Mongoose.
      </footer>
    </div>
  );
}
