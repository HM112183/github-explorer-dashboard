import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepositoryDetails, fetchRepositoryContributors, fetchRepositoryIssues } from '../api/github';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ChartDisplay from '../components/ChartDisplay';
import BookmarkButton from '../components/BookmarkButton';
import NoteTaking from '../components/NoteTaking';
import { useBookmark } from '../contexts/BookmarkContext';
import './RepositoryDetail.css'; // Import repository detail CSS

const RepositoryDetail = () => {
  const { owner, repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookmarkedRepos } = useBookmark();

  useEffect(() => {
    const getRepoData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [repoData, contributorData, issueData] = await Promise.all([
          fetchRepositoryDetails(owner, repoName),
          fetchRepositoryContributors(owner, repoName),
          fetchRepositoryIssues(owner, repoName)
        ]);
        setRepository(repoData);
        setContributors(contributorData);
        setIssues(issueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getRepoData();
  }, [owner, repoName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!repository) {
    return <ErrorMessage message="Repository not found." />;
  }

  const isBookmarked = bookmarkedRepos.some(repo => repo.id === repository.id);

  const contributorChartData = {
    labels: contributors.slice(0, 10).map(c => c.login),
    datasets: [{
      label: 'Contributions',
      data: contributors.slice(0, 10).map(c => c.contributions),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const issueChartData = {
    labels: ['Open Issues', 'Closed Issues'],
    datasets: [{
      label: 'Issues',
      data: [
        issues.filter(issue => issue.state === 'open').length,
        issues.filter(issue => issue.state === 'closed').length
      ],
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
    }],
  };

  return (
    <div className="repository-detail">
      <h1 className="repo-detail-title">{repository.name}</h1>
      <p className="repo-detail-description">{repository.description}</p>
      <div className="repo-info-row">
        <span className="repo-stars-info">
          <svg className="repo-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69L9.049 2.927z"></path></svg>
          {repository.stargazers_count} stars
        </span>
        <span className="repo-language-info">Language: {repository.language || 'N/A'}</span>
        <span className="repo-updated-info">Last Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
      </div>

      <div className="repo-link-container">
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
          View on GitHub
        </a>
      </div>

      <BookmarkButton repository={repository} isBookmarked={isBookmarked} />
      <NoteTaking repositoryId={repository.id} />

      <div className="charts-section">
        <div>
          <h2 className="chart-title">Top 10 Contributors</h2>
          <ChartDisplay type="bar" data={contributorChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        <div>
          <h2 className="chart-title">Issue Status</h2>
          <ChartDisplay type="doughnut" data={issueChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;