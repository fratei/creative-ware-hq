import { get_participants, get_facilitator, get_standup_date } from './your_module';

describe('your_module', () => {
  it('should return participants', () => {
    const participants = get_participants();
    expect(participants).toEqual(['Orchestrator', 'CEO', 'CPO', 'CTO', 'Engineering', 'DevOps', 'QA', 'Marketing', 'Sales', 'CS', 'CFO', 'CISO', 'HR', 'Legal']);
  });

  it('should return facilitator', () => {
    const facilitator = get_facilitator();
    expect(facilitator).toBe('Standup Facilitator Agent');
  });

  it('should return standup date', () => {
    const standupDate = get_standup_date();
    const today = new Date().toISOString().split('T')[0];
    expect(standupDate).toBe(today);
  });

  it('should handle edge case for get_standup_date', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01T00:00:00.000Z'));
    const standupDate = get_standup_date();
    expect(standupDate).toBe('2022-01-01');
    jest.useRealTimers();
  });
}
