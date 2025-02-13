import Card from '../components/Card';
import Form from '../components/Form';
import ParticipantsList from '../components/ParticipantList';
import Footer from '../components/Footer';

const Configuration = () => {
    return (
        <Card>
            <section>
                <h2>Let's get started! (Min 3 people)</h2>
                <Form />
                <ParticipantsList />
                <Footer />
            </section>
        </Card>
    );
};

export default Configuration;
