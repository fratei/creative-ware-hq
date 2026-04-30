import requests
from bs4 import BeautifulSoup
from datetime import datetime
import unittest
from unittest.mock import patch

def get_participants():
    # Assume this function fetches participants from a database or API
    return [
        'Orchestrator', 'CEO', 'CPO', 'CTO', 'Engineering', 'DevOps', 'QA',
        'Marketing', 'Sales', 'CS', 'CFO', 'CISO', 'HR', 'Legal'
    ]

def get_facilitator():
    # Assume this function fetches facilitator from a database or API
    return 'Standup Facilitator Agent'

def get_standup_date():
    return datetime.now().strftime('%Y-%m-%d')

def extract_market_moves(links):
    market_moves = []
    for link in links:
        response = requests.get(link)
        soup = BeautifulSoup(response.text, 'html.parser')
        market_moves.append(soup.title.text)
    return market_moves

def generate_standup_report(participants, facilitator, date, market_moves):
    report = f'🗓️ Daily Standup — Night Shift ({date})\n\n'
    report += f'**Participants:** {", ".join(participants)}\n'
    report += f'**Facilitator:** {facilitator}\n'
    report += f'**Market Moves:**\n'
    for move in market_moves:
        report += f'- {move}\n'
    return report

def standup(links):
    participants = get_participants()
    facilitator = get_facilitator()
    date = get_standup_date()
    market_moves = extract_market_moves(links)
    report = generate_standup_report(participants, facilitator, date, market_moves)
    return report

class TestStandup(unittest.TestCase):
    @patch('your_module.get_participants')
    def test_standup_quick_alignment(self, mock_get_participants):
        mock_get_participants.return_value = [
            'Orchestrator', 'CEO', 'CPO', 'CTO', 'Engineering', 'DevOps', 'QA',
            'Marketing', 'Sales', 'CS', 'CFO', 'CISO', 'HR', 'Legal'
        ]
        with patch('your_module.get_facilitator') as mock_get_facilitator:
            mock_get_facilitator.return_value = 'Standup Facilitator Agent'
            links = [
                'https://news.google.com/rss/articles/CBMieEFVX3lxTE9PQUl0S2ZfakhOOHl3NFhTNXhPNU5SXzlQSGJpbE1kSHJLZkZ0SV96OHRaeFRoYmhLZUYtV1pPOU04N21CU0JwLWd1MTZ5SDVwdzFMZEJFVUl2WkZMT2ZBNFFnS3dzaXVIdE5xMDlWVkxIc21wVHpEYQ?oc=5',
                'https://news.google.com/rss/articles/CBMiiwFBVV95cUxOQkdZSUphMGR3X2ZDaTRZdGpuU19aNF93ajhFMFNUenU5TUZoTmhMaVFSM29WQ3dGcjR6dUxUanlSVnNZZFdua1dlWEh3Slo2ZlROaVF6VkJYX2I2Tk9yOUhIMXp2enQ2cEN1VVNrVVNobzV2eEdvMEpyYy1tSF8tcDRpeVNLOG8wTzVR?oc=5',
                'https://news.google.com/rss/articles/CBMiigFBVV95cUxQRkNwcTk2U1NDNz'
            ]
            self.assertEqual(standup(links), 
                             '🗓️ Daily Standup — Night Shift (2024-04-30)\n\n'
                             '**Participants:** Orchestrator, CEO, CPO, CTO, Engineering, DevOps, QA, Marketing, Sales, CS, CFO, CISO, HR, Legal\n'
                             '**Facilitator:** Standup Facilitator Agent\n'
                             '**Market Moves:**\n'
                             '- Deepgram Raises $130 Million Series C - The SaaS News\n'
                             '- Exclusive | Voice AI Startup ElevenLabs Raises $500 Million - WSJ\n'
                             '- Exclusive: Flip Raises $20M Series A For Its Verticalized Approach To AI-Based Customer Service - Crunchbase News\n')

if __name__ == '__main__':
    unittest.main()